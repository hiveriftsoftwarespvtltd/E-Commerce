import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem, SubItem } from '../dto/menu-item.dto';
import slugify from 'slugify';

@Injectable()
export class MenuService {
  constructor(@InjectModel('MenuItem') private menuItemModel: Model<MenuItem>) {}

  private async generateUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;
    while (await this.menuItemModel.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  private async generateUniqueSubItemSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;
    while (await this.menuItemModel.findOne({ 'subItems.slug': slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  async createMenuItem(menuData: { menuName: string; subItems: SubItem[]; slug?: string }): Promise<MenuItem> {
    const allowedMenuNames = ['laundry', 'KITCHEN'];
    if (!allowedMenuNames.includes(menuData.menuName)) {
      throw new BadRequestException(`Invalid menuName. Allowed: ${allowedMenuNames.join(', ')}`);
    }

    let menuSlug = slugify(menuData.menuName, { lower: true });
    menuSlug = await this.generateUniqueSlug(menuSlug);
    menuData.slug = menuSlug;

    for (const subItem of menuData.subItems) {
      let subSlug = slugify(subItem.name, { lower: true });
      subSlug = await this.generateUniqueSubItemSlug(subSlug);
      subItem.slug = subSlug;
    }

    const newMenu = new this.menuItemModel({ ...menuData });
    return newMenu.save();
  }

  async getAllMenuItems(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  async getMenuByName(menuName: string): Promise<MenuItem | null> {
    return this.menuItemModel.findOne({ menuName }).exec();
  }

  async updateMenuItem(id: string, updateData: any): Promise<MenuItem | null> {
    if (updateData.menuName) {
      let menuSlug = slugify(updateData.menuName, { lower: true });
      menuSlug = await this.generateUniqueSlug(menuSlug);
      updateData.slug = menuSlug;
    }

    if (updateData.subItems) {
      for (const subItem of updateData.subItems) {
        if (subItem.name) {
          let subSlug = slugify(subItem.name, { lower: true });
          subSlug = await this.generateUniqueSubItemSlug(subSlug);
          subItem.slug = subSlug;
        }
      }
    }

    return this.menuItemModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteMenuItem(id: string): Promise<MenuItem | null> {
    return this.menuItemModel.findByIdAndDelete(id).exec();
  }
}
