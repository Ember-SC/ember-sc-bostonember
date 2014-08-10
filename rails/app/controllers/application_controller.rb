class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  # Here's a solution from oldfartdeveloper's comment
  # on https://coderwall.com/p/8z7z3a
  protect_from_forgery with: :null_session,
      if: Proc.new { |c| c.request.format =~ %r{application/json} }
end
