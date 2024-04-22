import styled from 'styled-components';

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 290px;
  height: 100%;
  position: relative;
  border-right: 1px solid #1212128c;

  .sidebar-navigation {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 30px 16px;
  }

  .menu-tagLine {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    text-transform: uppercase;
    padding: 0 26px;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    max-height: calc(100vh - 250px);
  }

  .sidebar-userProfile {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 26px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
      #121212;
  }
  .user-detail {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .user-desc {
    .user-email {
      font-size: 12px;
    }
  }
  .user-logout {
    cursor: pointer;
  }
`;

export const StyledSidebarMenu = styled.div`
  display: flex;
  padding: 16px 26px;
  align-items: center;
  border-radius: 14px;
  gap: 6px;

  &:hover {
    background: #6002ee;
  }
`;
