class ScoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :score
  belongs_to :user
end
