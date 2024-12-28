class Career:
    def __init__(self, id: int, title: str, description: str):
        self.id = id
        self.title = title
        self.description = description

    def __repr__(self):
        return f"<Career {self.title}>"

    # Add methods for interacting with the database as needed
    # For example, methods to save, update, or delete career records can be added here.