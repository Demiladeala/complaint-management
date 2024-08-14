import { useState } from 'react';

type Props = {
  page?: boolean
}

const complaintsData = [
  { name: 'Complaint 1', status: 'New', date: '2024-08-01' },
  { name: 'Complaint 2', status: 'Resolved', date: '2024-08-02' },
  { name: 'Complaint 3', status: 'Pending', date: '2024-08-03' },
  { name: 'Complaint 4', status: 'Pending', date: '2024-08-03' },
  { name: 'Complaint 5', status: 'Pending', date: '2024-08-03' },
  { name: 'Complaint 6', status: 'Pending', date: '2024-08-03' },
  { name: 'Complaint 7', status: 'Pending', date: '2024-08-03' },
  { name: 'Complaint 8', status: 'Pending', date: '2024-08-03' },
];

const RecentComplaints = ({page}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesSearch = complaint.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || complaint.status === selectedStatus;
    const matchesDateRange = (!startDate || new Date(complaint.date) >= new Date(startDate)) &&
                              (!endDate || new Date(complaint.date) <= new Date(endDate));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className={`${page ? "" : "mt-16" }`}>
      <div className="border-y py-8 lg:py-12 border-gray-100">
        <div className="w-full grid grid-cols-1 gap-7">
          <div className="flex flex-wrap justify-between items-center gap-6 mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border px-4 py-2 rounded"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Paused">Paused</option>
            </select>
           <div className='flex items-center gap-1'>
                <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-4 py-2 rounded"
                />
                <label className='text-sm'>Start Date</label>
           </div>           
           <div className='flex items-center gap-1'>
                <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border px-4 py-2 rounded"
                />
                <label className='text-sm'>Start Date</label>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{complaint.name}</td>
                  <td className="border px-4 py-2">{complaint.status}</td>
                  <td className="border px-4 py-2">{complaint.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentComplaints;