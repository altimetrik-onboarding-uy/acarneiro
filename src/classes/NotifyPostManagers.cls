global class NotifyPostManagers implements Schedulable {
	global void execute(SchedulableContext sc) {
		NotifyPostManagersBatch notifybatch = new NotifyPostManagersBatch();

		Database.executeBatch(notifybatch);
	}
}