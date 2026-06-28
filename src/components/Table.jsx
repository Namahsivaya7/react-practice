
function UserTable() {
  const users = [
    { id: 1, name: "John", email: "john@gmail.com", role: "Admin" },
    { id: 2, name: "David", email: "david@gmail.com", role: "User" },
    { id: 3, name: "Sarah", email: "sarah@gmail.com", role: "Manager" },
  ];

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;