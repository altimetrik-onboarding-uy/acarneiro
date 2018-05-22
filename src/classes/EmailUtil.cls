public class EmailUtil {
	public static void sendApprovePostMail(String approvermail) {
		Messaging.Singleemailmessage mail = new Messaging.Singleemailmessage();
		mail.setToAddresses(new String[] {approvermail});
		mail.setSubject('Post needs manager approval');
		mail.setPlainTextBody('You need to approve a post');
		Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
	}
}