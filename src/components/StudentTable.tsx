interface Student {
  email: string
  first_name: string
  last_name: string
  roll_no: string
}

export default function StudentTable({ data }: { data: Student[] }) {
  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No students match your search.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto shadow-md border rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th scope="col" className="px-6 py-3 border-b">First Name</th>
            <th scope="col" className="px-6 py-3 border-b">Last Name</th>
            <th scope="col" className="px-6 py-3 border-b">Email</th>
            <th scope="col" className="px-6 py-3 border-b">Roll No</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-6 py-4 whitespace-nowrap border-b">{student.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{student.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{student.email}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{student.roll_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
