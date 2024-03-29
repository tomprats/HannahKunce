class ItemsController < ApplicationController
  def index
    @groups = Group.all
    @items = Item.all
  end

  def create
    item = Item.create(item_params)
    if item.valid?
      render json: { status: 200, id: item.id, html: render_to_string(partial: "items/row", locals: { item: item }, layout: false) }
    else
      render json: { status: 400, message: item.errors.full_messages.join(", ")  }
    end
  end

  def edit
    item = Item.find_by(id: params[:id])
    @groups = Group.all
    render json: { status: 200, html: render_to_string(partial: "items/edit", locals: { item: item }, layout: false) }
  end

  def update
    item = Item.find_by(id: params[:id])
    if item.update_attributes(item_params)
      render json: { status: 200, id: item.id, html: render_to_string(partial: "items/row", locals: { item: item }, layout: false) }
    else
      render json: { status: 400, message: item.errors.full_messages.join(", ")  }
    end
  end

  def destroy
    item = Item.find_by(id: params[:id])
    item.destroy
    render json: { status: 200 }
  end

  private
  def item_params
    params.require(:item).permit(:group_id, :name, :price, :description, :for_sale, :image)
  end
end
