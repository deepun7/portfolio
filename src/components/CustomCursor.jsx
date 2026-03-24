import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({
        x: -100,
        y: -100
    });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            const computedStyle = window.getComputedStyle(e.target);
            // Ignore cursor handling if target or its parent is intractable
            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                computedStyle.cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            height: 20,
            width: 20,
            backgroundColor: 'transparent',
            border: '2px solid rgba(99, 102, 241, 0.8)', // indigo-500
            mixBlendMode: 'normal'
        },
        hover: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            height: 80,
            width: 80,
            backgroundColor: 'rgba(99, 102, 241, 0.1)', // indigo
            border: '1px solid rgba(0, 229, 255, 0.5)', // cyan
            mixBlendMode: 'screen',
            backdropFilter: 'blur(2px)'
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            height: 8,
            width: 8,
            backgroundColor: 'rgba(0, 229, 255, 1)', // cyan
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            height: 8,
            width: 8,
            backgroundColor: 'transparent',
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                variants={variants}
                animate={isHovering ? 'hover' : 'default'}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000]"
                variants={dotVariants}
                animate={isHovering ? 'hover' : 'default'}
                transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 20,
                    mass: 0.2
                }}
            />
        </>
    );
};

export default CustomCursor;
