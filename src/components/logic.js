export const getWorkflowList = () => {
  return new Promise((resolve, reject) => {
    fetch(" https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const getWorkflow = (id) => {
  return new Promise((resolve, reject) => {
    fetch(` https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${id}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const getModules = (pageNumber) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${pageNumber}&limit=8`
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
