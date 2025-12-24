export default function initAssociations(db) {
  if (!db.User || !db.Club) return;

  db.User.belongsToMany(db.Club, {
    through: 'user_clubs',
    foreignKey: 'user_id',
    otherKey: 'club_id',
    as: 'joinedClubs'
  });

  db.Club.belongsToMany(db.User, {
    through: 'user_clubs',
    foreignKey: 'club_id',
    otherKey: 'user_id',
    as: 'members'
  });
}
