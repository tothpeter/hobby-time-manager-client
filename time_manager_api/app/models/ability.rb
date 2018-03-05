class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    return can :manage, :all if user.admin?

    # TODO: prevent changing access_level
    if user.manager?
      can :manage, User do |managed_user|
        managed_user.employee? || managed_user.id == user.id
      end
    end

    if user.employee?
      can :manage, User, id: user.id
      can :manage, Task, user_id: user.id
    end

    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
