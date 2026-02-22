'use client';
import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * TextType — A typing animation component with multi-color newline support.
 *
 * When the currently displayed text contains `\n`:
 *   - The first line (index 0) is rendered in Vivid Orange (#F77F00)
 *   - All subsequent lines (index 1+) are rendered in Deep Red (#D62828)
 *   - Each line is rendered as a block element for multi-line layout
 *
 * When there are no newlines, the text uses the standard textColors prop.
 */
const TextType = ({ text, as: Component = 'div', typingSpeed = 50, initialDelay = 0, pauseDuration = 2000, deletingSpeed = 30, loop = true, className = '', showCursor = true, hideCursorWhileTyping = false, cursorCharacter = '|', cursorClassName = '', cursorBlinkDuration = 0.5, textColors = [], primaryLineColor = '#F77F00', secondaryLineColor = '#D62828', variableSpeed, onSentenceComplete, startOnVisible = false, reverseMode = false, ...props }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const cursorRef = useRef(null);
    const containerRef = useRef(null);
    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return 'inherit';
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;
        const observer = new IntersectionObserver(
            entries => { entries.forEach(entry => { if (entry.isIntersecting) setIsVisible(true); }); },
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, { opacity: 0, duration: cursorBlinkDuration, repeat: -1, yoyo: true, ease: 'power2.inOut' });
        }
    }, [showCursor, cursorBlinkDuration]);

    useEffect(() => {
        if (!isVisible) return;
        let timeout;
        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) return;
                    if (onSentenceComplete) onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    setCurrentTextIndex(prev => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => { }, pauseDuration);
                } else {
                    timeout = setTimeout(() => { setDisplayedText(prev => prev.slice(0, -1)); }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(() => {
                        setDisplayedText(prev => prev + processedText[currentCharIndex]);
                        setCurrentCharIndex(prev => prev + 1);
                    }, variableSpeed ? getRandomSpeed() : typingSpeed);
                } else if (textArray.length >= 1) {
                    if (!loop && currentTextIndex === textArray.length - 1) return;
                    timeout = setTimeout(() => { setIsDeleting(true); }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }
        return () => clearTimeout(timeout);
    }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex, loop, initialDelay, isVisible, reverseMode, variableSpeed, onSentenceComplete]);

    const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    // ────────────────────────────────────────────────────
    // Multi-color newline rendering:
    //   • If displayedText contains \n → split into lines
    //     → Line 0: Vivid Orange (#F77F00) — the role title
    //     → Line 1+: Deep Red (#D62828) — the bullet points
    //
    //   IMPORTANT: We use INLINE spans and re-insert \n as
    //   text nodes between them. The container's
    //   whitespace-pre-wrap then renders the \n as a visual
    //   line break. We must NOT use display:block spans
    //   because that would create a SECOND line break on
    //   top of the \n → doubling the spacing.
    // ────────────────────────────────────────────────────
    const renderText = () => {
        if (displayedText.includes('\n')) {
            const lines = displayedText.split('\n');
            return (
                <>
                    {/* Line 0: role title — Vivid Orange (inline) */}
                    <span style={{ color: primaryLineColor }}>{lines[0]}</span>
                    {/* Lines 1+: bullet points — Deep Red (inline + \n for break) */}
                    {lines.slice(1).map((line, i) => (
                        <span key={i} style={{ color: secondaryLineColor }}>{'\n'}{line}</span>
                    ))}
                </>
            );
        }
        // No newlines — use the standard textColors per-phrase cycling
        const color = getCurrentTextColor() || 'inherit';
        return <span style={{ color }}>{displayedText}</span>;
    };

    return createElement(
        Component,
        { ref: containerRef, className: `inline-block whitespace-pre-wrap tracking-tight ${className}`, ...props },
        renderText(),
        showCursor && (
            <span ref={cursorRef} className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}>
                {cursorCharacter}
            </span>
        )
    );
};
export default TextType;
