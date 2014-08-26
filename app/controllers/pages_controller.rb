class PagesController < ApplicationController
  def index
    @groups = Group.all.select { |g| !g.items.empty? }
  end

  def about
  end
end
