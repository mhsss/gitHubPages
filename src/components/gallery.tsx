import React from 'react'
import style from '../css/gallery.module.css'
import Items from './items'
import ImageForm from './gallery-form'
import { connect } from 'react-redux'
import { setGalleryItem, deleteGalleryItem, galleryInitializing } from '../redux/gallery-reducer'
import { reset } from 'redux-form';

type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    galleryInitializing: () => void
    setGalleryItem: (title: any) => void
    reset: (text: string) => void
    deleteGalleryItem: (id: string) => void
}

type PropsType = StatePropsType & DispatchPropsType


class Gallery extends React.Component<PropsType> {

    componentDidMount() {
        this.props.galleryInitializing()
    }

    render() {
        const onSubmit = (formData: any) => {

            if (this.props.item.some((e: any) => e.title === formData.title)) {
                alert('this title is already exist,please choose another one')

            } else {
                this.props.setGalleryItem(formData)
            }
            this.props.reset('imageForm')
        }

        return <div className={style.main__box}>
            <div className={style.mainTitle__box}>
            <ImageForm onSubmit={onSubmit} />
            </div>
        
            <div>
            <p className={style.bot__title}>You can see description or delete/download image,just focus on it: </p>
            {
                this.props.item.length ?
                    <Items item={this.props.item} deleteGalleryItem={this.props.deleteGalleryItem} />
                    : <h4 className={style.botTitle}>Storage is empty you can upload something</h4>
            }
            </div>

         
        </div >
    }
}

const mapStateToProps = (state: any) => ({
    item: state.gallery.item
})

export default connect(mapStateToProps, { reset, setGalleryItem, galleryInitializing, deleteGalleryItem })(Gallery)