import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PlanService } from './plan.service';
import { PlanDto } from './dto/plan.dto';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'webImage', maxCount: 1 }, { name: 'appImage', maxCount: 1 }]))
  create(@UploadedFiles() files: { webImage?: Express.Multer.File[]; appImage?: Express.Multer.File[] }, @Body() planDto: PlanDto) {
    return this.planService.createPlan(planDto, files);
  }

  @Get('getByPlanId/:id')
  getPlanById(@Param('id') id: string) {
    return this.planService.getPlanById(id);
  }

  @Get('subcategory/:subCategoryId')
  getPlansBySubCategory(@Param('subCategoryId') subCategoryId: string) {
    return this.planService.getPlansBySubCategory(subCategoryId);
  }

  @Get('usertype/:userType')
  getPlansByUserType(@Param('userType') userType: string) {
    return this.planService.getPlansByUserType(userType);
  }

  @Put('editPlan/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'webImage', maxCount: 1 }, { name: 'appImage', maxCount: 1 }]))
  updatePlan(@Param('id') id: string, @Body() planDto: PlanDto, @UploadedFiles() files: { webImage?: Express.Multer.File[]; appImage?: Express.Multer.File[] }) {
    return this.planService.updatePlan(id, planDto, files);
  }

  @Get('getFilteredPlan')
  getFilteredPlan(@Query() filterParams: Record<string, any>) {
    return this.planService.getFilteredPlan(filterParams);
  }

  @Delete(':id')
  deletePlan(@Param('id') id: string) {
    return this.planService.deletePlan(id);
  }
}
