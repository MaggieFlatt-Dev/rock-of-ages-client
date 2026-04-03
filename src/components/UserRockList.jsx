import { useEffect } from "react";

export const UserRockList = ({ usersRocks, fetchUsersRocks }) => {
  useEffect(() => {
    fetchUsersRocks(usersRocks);
  }, []);

  const deleteUsersRockFromAPI = (id) => {
    return fetch(`http://localhost:8000/rocks/${id}`, {
      method: "DELETE",
       headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                }
    })
  }
  
  const deleteRock = (id) => {
    deleteUsersRockFromAPI(id).then(() => {
      fetchUsersRocks()
    }
    )
   }

  const displayRocks = () => {
    if (usersRocks && usersRocks.length) {
      return usersRocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-teal-400 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
              {rock.name} ({rock.type.label}) 
              <br/>
          In the collection of {rock.user.first_name} {rock.user.last_name}
          <br/>
          <button
            onClick={() => { deleteRock(rock.id) }}
            className="border p-1 mt-2 rounded-md bg-red-400 text-bold">Delete</button>
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};