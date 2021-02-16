import validateReminder from '../utils/validateReminder';

const wrongReminderTest = {
  id: 5,
  description:"Is simply dummy text of the printing and typesetting industry. ",
  city:"",
  color:"",
  date:"02 19 2021",
  timeInMilliseconds:32880,
  time:"",
}

describe("Adding new Reminder", () => {
  describe("Failed attempt", () => {

    it("Reminder is > 30 chars", () => {
      expect(validateReminder(wrongReminderTest)).toEqual('Description should be maximum of 30 chars.');
    });

    it('Reminder has empty fields', () => {
      wrongReminderTest.description = '';
      expect(validateReminder(wrongReminderTest)).toEqual('All fields are required.')
    });
  });
});