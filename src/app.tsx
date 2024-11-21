export const layout = () => {
  return {
    layout: 'mix', // Kiểu layout mix hoặc top
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    headerRender: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          height: '64px',
        }}
      >
        <div>
          <img
            src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
            alt="Logo"
            style={{ height: '32px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 16 }}>Hello, User!</span>
          <a href="/logout">Logout</a>
        </div>
      </div>
    ),
    footerRender: () => (
      <div
        style={{
          textAlign: 'center',
          padding: '16px 0',
          background: '#f0f2f5',
          borderTop: '1px solid #e8e8e8',
        }}
      >
        © 2024 Your Company. All rights reserved.
      </div>
    ),
    contentStyle: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Đảm bảo chiều cao tối thiểu của trang
    },
  };
};
