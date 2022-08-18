import Page from "../components/Page";
import React from "react";
import { Avatar, Grid, Button, Stack } from "@mui/material";
import { useCurrentAdmin } from "../hooks/useCurrentAdmin";
import empty from "../assets/empty.jpg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addOrUpdate, storage } from "../services";

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7
// );

const DashboardPage = () => {
  // componentDidMount() {
  //   // this is needed, because InfiniteCalendar forces window scroll
  //   window.scrollTo(0, 0);
  // }

  const adminId = "ETAIhJjsyEhIrRXOJ9Or3g0NJ7E3";

  const { data } = useCurrentAdmin("ETAIhJjsyEhIrRXOJ9Or3g0NJ7E3");
  console.log(data);

  const handleUpload = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, `admins/${adminId}/profile/${file.name}`);
    const uploadTask = await uploadBytes(storageRef, file);
    console.log(uploadTask);
    const downloaUrl = await getDownloadURL(uploadTask.ref);

    addOrUpdate(`admins/${adminId}`, { profile: downloaUrl });

    e.persist();
  };

  return (
    <Page
      className="DashboardPage"
      title="Dashboard"
      breadcrumbs={[{ name: "Dashboard", active: true }]}
    >
      {/* <Row>
          <Col></Col>
        </Row> */}

      <Grid container spacing={1} direction="row">
        <Grid
          item
          sx={{ minWidth: "210px" }}
          flexBasis={"20%"}
          container
          spacing={2}
          direction="column"
          xs={12}
          sm={4}
        >
          <Grid item>
            {data?.profile ? (
              <Avatar
                alt={data?.fullName}
                src={data?.profile}
                sx={{ width: 200, height: 200 }}
              />
            ) : (
              <Avatar
                alt={data?.fullName}
                src={empty}
                sx={{ width: 200, height: 200 }}
              />
            )}
          </Grid>
          <Grid item>
            {" "}
            <input
              type={"file"}
              hidden
              id="admin_imUp"
              onChange={handleUpload}
              accept="image/png, image/jpeg, image/jpg"
              multiple={false}
            />
            <Button
              variant="contained"
              onClick={() => {
                document.querySelector("#admin_imUp").click();
              }}
            >
              {data?.profile ? "Changez de" : "Ajoutez une"} photo
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          direction="column"
          flexGrow={3}
          flexBasis={"70%"}
          sx={{ minWidth: "none" }}
          xs={12}
          sm={8}
        >
          <Grid item>
            <p>
              <strong>Nom Complet: </strong>
              {data?.fullName}
            </p>
          </Grid>
          <Grid item>
            <p>
              <strong>Email: </strong>
              {data?.email}
            </p>
          </Grid>
          <Grid item>
            <p>
              <strong>Numero de Tel: </strong>
              {data?.phoneNumber}
            </p>
          </Grid>
          <Grid item>
            <p>
              <strong>Ville: </strong>
              {data?.city}
            </p>
          </Grid>
          <Grid item>
            <p>
              <strong>Pays: </strong>
              {data?.country}
            </p>
          </Grid>
        </Grid>
      </Grid>
      {/* <CardGroup style={{ marginBottom: "1rem" }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdDownload}
            title="50+ Telechargement"
            subtitle="Sur IOS"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdOutlineStarRate}
            title="2.5 sur 5"
            subtitle="Sur IOS"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="50+ commentaire"
            subtitle="Sur IOS"
          />
        </CardGroup>
        <CardGroup style={{ marginBottom: "1rem" }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdDownload}
            title="50+ Telechargement"
            subtitle="Sur Android"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdOutlineStarRate}
            title="2.5 sur 5"
            subtitle="Sur Android"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="50+ commentaire"
            subtitle="Sur Android"
          />
        </CardGroup> */}
    </Page>
  );
};
export default DashboardPage;
