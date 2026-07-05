import React from 'react';
import { useState } from 'react';

const EmployeeSort = () => {
    const [employees] = useState([
        { id: 1, name: "山田太郎", age: 28, department: "営業部", salary: 400000 },
        { id: 2, name: "佐藤花子", age: 35, department: "人事部", salary: 450000 },
        { id: 3, name: "鈴木一郎", age: 42, department: "開発部", salary: 600000 },
        { id: 4, name: "田中美咲", age: 26, department: "営業部", salary: 350000 },
        { id: 5, name: "高橋健", age: 31, department: "開発部", salary: 550000 },
        {
            id: 6,
            name: "伊藤さくら",
            age: 29,
            department: "人事部",
            salary: 380000,
        },
    ]);

    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSort = (key) => {};

    const sortedAndFilteredEmployees = employees
    .filter((emp) => {

    })
    .sort((a, b) => {

    });

    return (
        <div className="employee-sort">
            <h2>従業員リスト</h2>
            <div className="controls">
                <input
                    type="text"
                    placeholder="名前または部署で検索..."
                    className="search-input"
                />
                <button className="reset-button">元の順番に戻す</button>
            </div>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th className="sortable">
                            名前{sortKey === "name" && sortDirection === "asc" ? "△" : "▽"}
                        </th>
                        <th className="sortable">
                            年齢 {sortKey === "age" && (sortDirection === "asc" ? "△" : "▽")}
                        </th>
                        <th>部署</th>
                        <th className="sortable">
                            給与{" "}
                            {sortKey === "salary" && (sortDirection === "asc" ? "△" : "▽")}
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div className="info">
                <p>表示件数: {}件</p>
            </div>
        </div>
    )
}

export default EmployeeSort
