import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const UsernameContainer = styled.div`
  display: flex;
  gap: 16px;
`;
export const UserProfile = styled.div`
  background-color: #ceb1fa;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
export const UserName = styled.p`
  color: #6002ee;
  font-size: 24px;
  font-weight: 400;
  margin: 0%;
`;
export const InfoBox = styled.div``;
export const Name = styled.p`
  margin: 0%;
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  text-transform: capitalize;
`;
export const Email = styled.p`
  margin: 0%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    gap: 16px;
  }
`;
export const TabBox = styled.span`
  padding: 10px 10px 20px 10px;
  border-bottom: ${(props) => (props.active ? '2px solid #fff' : 'none')};
  cursor: pointer;
`;
export const TabName = styled.p`
  width: 100%;
  margin: 0%;
  color: ${(props) => (props.active ? '#fff' : 'rgba(255, 255, 255, 0.80)')};

  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ContentContainer = styled.div``;
