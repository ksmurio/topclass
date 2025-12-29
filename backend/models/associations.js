import User from './user.js';
import Club from './club.js';

const initAssociations = () => {
  User.belongsToMany(Club, {
    through: 'user_clubs',
    foreignKey: 'user_id',
    otherKey: 'club_id',
    as: 'joinedClubs', 
    timestamps: false,
  });

  Club.belongsToMany(User, {
    through: 'user_clubs',
    foreignKey: 'club_id',
    otherKey: 'user_id',
    as: 'members',
    timestamps: false,
  });

  Club.belongsTo(User, {
    foreignKey: 'creator_id',
    as: 'creator'
  });

  User.hasMany(Club, {
    foreignKey: 'creator_id',
    as: 'createdClubs' 
  });
};

export {initAssociations};
