module Api::V1::Admin
  class CategoriesController < ApplicationController
    def index
      categories = Category.all
      categories = categories.where(id: params[:ids]) if params[:ids].present?
      categories = categories.page(params[:page])
      render json: CategorySerializer.new(categories).serializable_hash
    end
  
    def show
      render json: CategorySerializer.new(category).serializable_hash
    end
  
    def create
      category = Category.new(category_params)
  
      if category.save
        render json: CategorySerializer.new(category).serializable_hash
      else
        render json: { errors: category.errors.full_messages }
      end
    end
  
    def update
      if category.update(category_params)
        render json: CategorySerializer.new(category).serializable_hash
      else
        render json: { errors: category.errors.full_messages }
      end
    end
  
    def destroy
      if category.destroy
        render json: { success: "deleted successfully." }
      else
        render json: { errors: "not deleted." }
      end
    end
  
    private
  
    def category
      @category ||= Category.find(params[:id])
    end
  
    def category_params
      params.require(:category).permit(:name)
    end
  end
end
