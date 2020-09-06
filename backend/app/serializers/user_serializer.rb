class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email_address, :password, :sprite_name
  has_many :scores
end
