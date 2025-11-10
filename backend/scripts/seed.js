import { User, Group, GroupMember, Expense, GroupExpense, ExpenseSplit } from '../src/models/index.js';
import sequelize from '../src/config/db.js';
import bcrypt from 'bcryptjs';

const seedData = async () => {
  try {
    // Clear existing data
    await ExpenseSplit.destroy({ where: {} });
    await GroupExpense.destroy({ where: {} });
    await Expense.destroy({ where: {} });
    await GroupMember.destroy({ where: {} });
    await Group.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create users
    const users = [];
    const userData = [
      { username: 'alice', email: 'alice@example.com', name: 'Alice Johnson' },
      { username: 'bob', email: 'bob@example.com', name: 'Bob Smith' },
      { username: 'charlie', email: 'charlie@example.com', name: 'Charlie Brown' },
      { username: 'diana', email: 'diana@example.com', name: 'Diana Prince' },
    ];

    for (const data of userData) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = await User.create({
        ...data,
        password: hashedPassword,
      });
      users.push(user);
    }

    // Create groups
    const groups = [];
    const groupData = [
      { name: 'Weekend Trip', description: 'Trip to mountains' },
      { name: 'Dinner Club', description: 'Monthly dinner outings' },
      { name: 'Game Night', description: 'Board games and fun' },
    ];

    for (let i = 0; i < groupData.length; i++) {
      const group = await Group.create({
        ...groupData[i],
        createdBy: users[i % users.length].id,
        code: `GRP${i + 1}`,
      });
      groups.push(group);

      // Add members to groups
      for (const user of users) {
        await GroupMember.create({
          groupId: group.id,
          userId: user.id,
        });
      }
    }

    // Generate 12 months of expenses
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);

    const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Accommodation', 'Shopping'];
    const descriptions = [
      'Lunch at restaurant',
      'Bus tickets',
      'Movie tickets',
      'Hotel booking',
      'Groceries',
      'Coffee',
      'Gas station',
      'Concert tickets',
      'Hotel stay',
      'Clothing',
    ];

    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + month);

      // Personal expenses for each user
      for (const user of users) {
        const numExpenses = Math.floor(Math.random() * 5) + 3; // 3-7 expenses per month per user

        for (let i = 0; i < numExpenses; i++) {
          const expenseDate = new Date(monthDate);
          expenseDate.setDate(Math.floor(Math.random() * 28) + 1); // Random day in month

          await Expense.create({
            userId: user.id,
            amount: Math.floor(Math.random() * 5000) + 500, // $5-$55
            name: descriptions[Math.floor(Math.random() * descriptions.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            category: expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
            date: expenseDate,
            type: 'expense',
          });
        }
      }

      // Group expenses
      for (const group of groups) {
        const numGroupExpenses = Math.floor(Math.random() * 3) + 1; // 1-3 group expenses per month

        for (let i = 0; i < numGroupExpenses; i++) {
          const expenseDate = new Date(monthDate);
          expenseDate.setDate(Math.floor(Math.random() * 28) + 1);

          const amount = Math.floor(Math.random() * 10000) + 1000; // $10-$110
          const lender = users[Math.floor(Math.random() * users.length)];

          const groupExpense = await GroupExpense.create({
            groupId: group.id,
            lenderId: lender.id,
            amount,
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            date: expenseDate,
            type: 'equal', // For simplicity, all equal splits
          });

          // Create expense splits for all group members
          const members = await GroupMember.findAll({ where: { groupId: group.id } });
          const splitAmount = amount / members.length;

          for (const member of members) {
            await ExpenseSplit.create({
              groupExpenseId: groupExpense.id,
              borrowerId: member.userId,
              lenderId: lender.id,
              amount: splitAmount,
              settled: Math.random() > 0.7, // 30% chance of being settled
            });
          }
        }
      }
    }

    console.log('Seed data created successfully!');
    console.log(`Created ${users.length} users, ${groups.length} groups`);
    console.log('Generated 12 months of expense data');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed function
seedData();