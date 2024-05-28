import { useEffect } from 'react'
import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'

const config = {
    scrollbars: {}
}

export default function useScrollBar(root, hasScroll) {
    let scrollBar;

    useEffect(() => {
        if (root.current, hasScroll) {
            scrollBar = OverlayScrollbars(root.current, config)
        }

        return () => {
            if (scrollBar) {
                scrollBar.destroy()
            }
        }
    }, [root, hasScroll])
}
