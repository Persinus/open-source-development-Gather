import React from 'react'
import { ModalProvider } from '@/app/hooks/useModal'
import ModalParent from '../Modal/ModalParent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Định nghĩa kiểu props cho Layout, có thể nhận children (các component con)
type LayoutProps = {
    children?: React.ReactNode
}

// Component Layout chính
const Layout:React.FC<LayoutProps> = ({ children }) => {

    return (
        // Bao toàn bộ ứng dụng trong ModalProvider để có thể dùng context quản lý modal
        <ModalProvider>
            {/* ToastContainer để hiển thị thông báo (react-toastify) */}
            <ToastContainer theme='colored' pauseOnHover={false}/>
            
            {/* ModalParent để quản lý modal cha */}
            <ModalParent />
            
            {/* Render nội dung con được truyền vào Layout */}
            {children}
        </ModalProvider>
    )
}

// Xuất Layout để có thể sử dụng ở nơi khác
export default Layout
