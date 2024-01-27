import { Table, Modal } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn xóa tất cả?',
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelteMany(rowSelectedKeys);
                setRowSelectedKeys([]);
            },
        });
    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };

    return (
        <Loading isLoading={isLoading}>
            {!!rowSelectedKeys.length && (
                <div className='bg-blue-700 hover:bg-blue-500 p-2 rounded font-bold text-white cursor-pointer'
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <button className='bg-green-500 hover:bg-green-700 rounded p-3 text-white mb-2' onClick={exportExcel}>Export Excel</button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent