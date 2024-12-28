class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def save(self):
        # Logic to save the user to the database
        pass

    @classmethod
    def find_by_username(cls, username):
        # Logic to find a user by username
        pass

    @classmethod
    def find_by_email(cls, email):
        # Logic to find a user by email
        pass

    def check_password(self, password):
        # Logic to check if the provided password matches the stored password
        pass