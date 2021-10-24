module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    db.collection('notifications').insertMany([
      {
        text: "Big sale next week",
        severity: "info"
      },
      {
        text: "New auction next month",
        severity: "info"
      },
      {
        text: "Limited edition books for next auction",
        severity: "warn"
      },
      {
        text: "New books with limited edition coming next week",
        severity: "success"
      },
      {
        text: "Last items with limited time offer",
        severity: "error"
      }
    ])
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    db.collection('users').remove({});
    db.collection('notifications').remove({});
  }
};
