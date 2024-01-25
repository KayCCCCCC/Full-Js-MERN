import { Button, Form, Modal, Select, Space, Upload } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils/utils'
import * as ProductService from '../../services/ProductService'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useMutation, useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {

    //inittial

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [stateProduct, setStateProduct] = useState(inittial())
    const searchInput = useRef(null);
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        discount: '',
    })

    // fetch data product
    const getAllProducts = async () => {
        const res = await ProductService.GetAllProduct()
        return res
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.GetAllTypeProduct()
        return res
    }

    //query

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { isLoading: isLoadingProducts, data: products } = queryProduct

    console.log(products)
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })

    const [form] = Form.useForm();

    //mutate

    const mutationCreate = useMutation(
        {
            mutationFn: data => {
                const { name,
                    price,
                    description,
                    rating,
                    image,
                    type,
                    countInStock, discount } = data
                const res = ProductService.CreateProduct({
                    name,
                    price,
                    description,
                    rating,
                    image,
                    type,
                    countInStock,
                    discount
                })
                return res
            }
        }
    )

    const { data, isPending, isSuccess, isError } = mutationCreate
    console.log(data)

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    const mutationUpdate = useMutation(
        {
            mutationFn: data => {
                const { id,
                    token,
                    ...rests } = data
                const res = ProductService.UpdateProduct(
                    id,
                    token,
                    { ...rests })
                return res
            },
        }
    )

    const mutationDeleted = useMutation(
        {
            mutationFn: data => {
                const { id,
                    token,
                } = data
                const res = ProductService.DeleteProduct(
                    id,
                    token)
                return res
            },
        }
    )

    const mutationDeletedMany = useMutation(
        {
            mutationFn: data => {
                const { token, ...ids
                } = data
                const res = ProductService.DeleteManyProduct(
                    ids,
                    token)
                return res
            },
        }
    )


    //handle event

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file) {
            console.log(file);
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateProduct({
                ...stateProduct,
                image: file.preview
            })
        }
    };

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
        })
        form.resetFields()
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinish = () => {
        console.log(stateProduct)
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount
        }
        mutationCreate.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const renderAction = () => {
        return (
            <div>
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            </div>
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    return (
        <div>
            <div className='font-bold text-3xl'>Quản lý sản phẩm</div>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
            </div>
            <div className='mt-5'>
                <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }}
                />
            </div>
            <Modal
                title="Tạo Sản Phẩm"
                open={isModalOpen}
                onOk={handleOk}
                onFinish={onFinish}
                onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: "darkcyan", color: "white" } }}
                footer={null}
            >
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <Select
                                name="type"
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </Form.Item>

                        {stateProduct.type === 'add_type' && (
                            <Form.Item
                                label='New type'
                                name="newType"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateProduct['countInStock']} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateProduct['price']} onChange={handleOnchange} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateProduct['description']} onChange={handleOnchange} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateProduct['rating']} onChange={handleOnchange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of product!' }]}
                        >
                            <InputComponent value={stateProduct['discount']} onChange={handleOnchange} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <Upload.Dragger onChange={handleOnchangeAvatar} maxCount={1} >
                                <Button >Select File</Button>
                                {stateProduct?.image && (
                                    <img src={stateProduct?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 17, span: 16 }}>
                            <div className='flex flex-row gap-x-3'>
                                <Button type="primary" onClick={handleCancel} style={{ backgroundColor: 'peru' }}>
                                    Cacel
                                </Button>
                                <Button type="primary" htmlType="submit" style={{ backgroundColor: 'darkcyan' }}>
                                    Apply
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>

        </div >
    )
}

export default AdminProduct