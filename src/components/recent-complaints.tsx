import { useState } from 'react';

type Props = {
  page?: boolean
}

type Status = 'new' | 'pending' | 'resolved' | 'paused';

type Complaint = {
  name: string;
  status: Status;
  date: string;
}

const statusColors = {
  new: '#FF5733', // Vibrant Orange
  pending: '#FFC300', // Bright Yellow
  resolved: '#28A745', // Success Green
  paused: '#6C757D' // Muted Gray
};

const complaintsData:Complaint[] = [
  { name: 'Complaint 1', status: 'new', date: '2024-08-01' },
  { name: 'Complaint 2', status: 'resolved', date: '2024-08-02' },
  { name: 'Complaint 3', status: 'pending', date: '2024-08-03' },
  { name: 'Complaint 4', status: 'pending', date: '2024-08-03' },
  { name: 'Complaint 5', status: 'pending', date: '2024-08-03' },
  { name: 'Complaint 6', status: 'pending', date: '2024-08-03' },
  { name: 'Complaint 7', status: 'pending', date: '2024-08-03' },
  { name: 'Complaint 8', status: 'pending', date: '2024-08-03' },
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
    <div className={`${page ? '' : 'mt-16'}`}>
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
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="paused">Paused</option>
          </select>
          <div className="flex items-center gap-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <label className="text-sm">Start Date</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <label className="text-sm">End Date</label>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse font-medium">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 lg:text-lg">{complaint.name}</td>
                  <td className="px-4 py-3 lg:text-lg flex items-center">
                    <div
                      className="w-2 h-2 rounded-full mr-2 lg:mr-3"
                      style={{ backgroundColor: statusColors[complaint.status] }}
                    ></div>
                    {complaint.status}
                  </td>
                  <td className="px-4 py-3 lg:text-lg">{complaint.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RecentComplaints;