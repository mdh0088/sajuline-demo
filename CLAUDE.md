# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Saju Line (사주라인)** is a Korean fortune-telling and Saju consultation web platform. This is a static HTML/CSS website with 28 pages providing various fortune-telling services, user management, and consultation features.

## Architecture

### Static Site Structure
- Pure HTML/CSS implementation with no external frameworks
- All styling is done via inline `<style>` tags within each HTML file
- No build process or compilation steps required
- No external dependencies or package management

### Page Categories
- **Authentication**: `login-page.html`, `signup-page.html`, `signup-page_v2.html`
- **Core Services**: `main.html`, `ai-fortune-complete.html`, `chatting.html`, `detail.html`
- **User Management**: `mypage.html`, `point.html`, `point_guide.html`, `point_log.html`, `favorite.html`
- **Customer Service**: `chat-cs-page.html`, `quick-cs-page.html`, `ai_cs2.html`, `cs_log.html`
- **Information**: `notice.html`, `notice_detail.html`, `event.html`, `event_detail.html`
- **Support**: `inquiry-list.html`, `inquiry-detail.html`, `inquiry-write.html`, `review-page.html`
- **Utility**: `search-page.html`, `chat_list.html`, `member_benefit.html`
- **Legal**: `privacy.html`, `provision.html`

## Design System

### Color Palette
- **Primary Background**: `#0a0a0f` (dark navy/black)
- **Primary Gradient**: `#B794F6` → `#9F7AEA` → `#805AD5` (purple spectrum)
- **Accent Purple**: `#9333EA`
- **Text**: `#ffffff` (white)
- **Border/Divider**: `rgba(255, 255, 255, 0.1)` (translucent white)

### Typography
Standard font stack across all pages:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
```

### Common UI Patterns

#### Header Structure
All pages use a consistent fixed header pattern:
- `.header` - Fixed positioned with backdrop blur effect
- `.header-top` - Flex container with 60px height, 16px-20px padding
- `.back-button` - 36x36px transparent button with white text
- `.header-title` - Centered title with absolute positioning
- `.header-actions` - Right-aligned icon buttons

#### Button Styles
- **Icon buttons**: 36x36px, transparent background, white text
- **Primary buttons**: Purple gradient backgrounds with rounded corners
- **Interactive states**: All buttons include hover/focus transitions

#### Layout Patterns
- **Main content**: Always includes `margin-top: 60px` to account for fixed header
- **Profile sections**: Centered layout with gradient backgrounds
- **Card components**: Rounded corners with subtle border/shadow effects

### JavaScript Implementation
Most pages include inline JavaScript for:
- Form validation and submission
- Interactive UI elements (toggles, modals)
- Navigation handling
- Chat functionality (in `chatting.html`)

## Development Guidelines

### File Editing Approach
- Each HTML file is self-contained with all styles and scripts inline
- Maintain consistent design patterns across pages
- Follow the established color scheme and typography
- Keep responsive design principles (mobile-first approach)

### Code Style Consistency
- Use consistent CSS class naming (kebab-case)
- Maintain the established indentation (4 spaces)
- Follow the existing gradient and shadow patterns
- Preserve Korean language content and structure

### Common Components to Reuse
When creating new pages or modifying existing ones:
1. **Header structure** - Copy from any existing page
2. **Button styles** - Use established icon-btn and primary button patterns
3. **Profile/avatar components** - Reference `mypage.html` or `detail.html`
4. **Form elements** - Check `login-page.html` or `signup-page.html`
5. **Chat interfaces** - Reference `chatting.html` for messaging patterns

### Mobile Responsiveness
All pages use:
- `viewport` meta tag for mobile optimization
- Flexbox layouts for responsive design
- Consistent padding/margin patterns for different screen sizes
- Touch-friendly button sizes (minimum 36px)

## File Modification Notes
- Modified files from git status: `chatting.html`, `detail.html`, `main.html`, `mypage.html`, `point.html`
- These files likely contain the most current design patterns and should be referenced for consistency