import { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

import Apps from '@mui/icons-material/Apps';
import ViewList from '@mui/icons-material/ViewList';

import axios from 'axios';
import { Typography } from '@mui/material';
import FlexBox from '../components/FlexBox';
import ProductsGridView from '../components/ProductGridView';
import ProductsListView from '../components/ProductListView';

const Product = () => {
  const [view, setView] = useState('grid');
  const toggleView = useCallback(v => () => setView(v), []);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);

  const updateCurrentPage = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`,
      );
      setProducts(response.data.products);
      setTotalItems(response.data.total);
    };

    fetchProducts();
  }, [currentPage]);
  return (
    <Container
      sx={{
        mt: 4,
        mb: 6,
      }}
    >
      {/* FILTER ACTION AREA */}
      <Card
        elevation={1}
        sx={{
          mb: '55px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: {
            sm: '1rem 1.25rem',
            md: '0.5rem 1.25rem',
            xs: '1.25rem 1.25rem 0.25rem',
          },
        }}
      >
        <div>
          <Typography variant="h5">Searching for “ mobile phone ”</Typography>
          <Typography variant="subtitle1" color="grey.600">
            48 results found
          </Typography>
        </div>

        <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem">
          <FlexBox alignItems="center" my="0.25rem">
            <Typography variant="subtitle1" color="grey.600" mr={1}>
              View:
            </Typography>
            <IconButton onClick={toggleView('grid')}>
              <Apps
                color={view === 'grid' ? 'primary' : 'inherit'}
                fontSize="small"
              />
            </IconButton>
            <IconButton onClick={toggleView('list')}>
              <ViewList
                color={view === 'list' ? 'primary' : 'inherit'}
                fontSize="small"
              />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </Card>
      <Grid container spacing={3}>
        <Grid item md={9} xs={12}>
          {view === 'grid' ? (
            <ProductsGridView
              products={products}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalItems={totalItems}
              updateCurrentPage={updateCurrentPage}
            />
          ) : (
            <ProductsListView
              products={products}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalItems={totalItems}
              updateCurrentPage={updateCurrentPage}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
