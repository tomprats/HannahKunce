class GroupsController < ApplicationController
  def index
    @groups = Group.all
    @items = Item.all
  end

  def create
    group = Group.create(group_params)
    if group.valid?
      render json: { status: 200, id: group.id, html: render_to_string(partial: "groups/row", locals: { group: group }, layout: false) }
    else
      render json: { status: 400, message: group.errors.full_messages.join(", ")  }
    end
  end

  def edit
    group = Group.find_by(id: params[:id])
    @items = Item.all
    render json: { status: 200, html: render_to_string(partial: "groups/edit", locals: { group: group }, layout: false) }
  end

  def update
    group = Group.find_by(id: params[:id])
    if group.update_attributes(group_params)
      render json: { status: 200, id: group.id, html: render_to_string(partial: "groups/row", locals: { group: group }, layout: false) }
    else
      render json: { status: 400, message: group.errors.full_messages.join(", ")  }
    end
  end

  def destroy
    group = Group.find_by(id: params[:id])
    group.destroy
    render json: { status: 200 }
  end

  private
  def group_params
    params.require(:group).permit(:name, :description, :primary_item_id)
  end
end
