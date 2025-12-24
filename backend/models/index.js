import User from './user.js';
import Club from './club.js';
// Importe outros modelos aqui

// Defina todas as associações
Club.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator'
});

Club.belongsToMany(User, {
  through: 'user_clubs',
  foreignKey: 'club_id',
  otherKey: 'user_id',
  as: 'members'
});

User.belongsToMany(Club, {
  through: 'user_clubs',
  foreignKey: 'user_id',
  otherKey: 'club_id',
  as: 'clubs'
});

// Exporte todos os modelos juntos
export { User, Club };
