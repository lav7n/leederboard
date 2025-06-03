import React, { useEffect, useState } from "react";
import axios from "axios";

const users = ["lavensri", "aquila0911"];
const apiUrl = "https://alfa-leetcode-api.onrender.com";

const fetchStats = async (username) => {
  const res = await axios.get(`${apiUrl}/${username}/solved`);
  return res.data;
};

const Skeleton = () => (
  <div className="animate-pulse space-y-2">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-4 bg-gray-700 rounded w-full" />
    ))}
  </div>
);

const UserCard = ({ username, data }) => {
  const totalSolved =
    data?.easySolved + data?.mediumSolved + data?.hardSolved || 0;

  return (
    <div className="w-full max-w-xs bg-gray-800 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300">
      <h2 className="text-xl font-semibold text-center mb-4 text-white">{username}</h2>
      {data ? (
        <ul className="space-y-2 text-gray-300">
          <li className="flex justify-between"><span>Easy:</span><span>{data.easySolved}</span></li>
          <li className="flex justify-between"><span>Medium:</span><span>{data.mediumSolved}</span></li>
          <li className="flex justify-between"><span>Hard:</span><span>{data.hardSolved}</span></li>
          <li className="flex justify-between font-bold text-yellow-400"><span>Total:</span><span>{totalSolved}</span></li>
        </ul>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default function App() {
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    users.forEach(async (u) => {
      const stats = await fetchStats(u);
      setUserStats((prev) => ({ ...prev, [u]: stats }));
    });
  }, []);

  return (
    <div className="flex justify-center gap-8 p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen items-center">
      {users.map((u) => (
        <UserCard key={u} username={u} data={userStats[u]} />
      ))}
    </div>
  );
}
