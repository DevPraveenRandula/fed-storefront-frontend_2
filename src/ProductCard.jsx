import { useState, useCallback } from "react"; 
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";
import { toggleSaved } from "./lib/savedSlice";
import { Link } from 'react-router';  
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard(props) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);
  const isSaved = savedItems.some((item) => item._id === props._id);

  const handleClick = useCallback(() => {
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      })
    );

    setTimeout(() => {
      toast.success("Item added to cart!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,  
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }, 100); 
  }, [dispatch, props]);

  const handleSave = () => {
    dispatch(toggleSaved({ _id: props._id, name: props.name }));

    toast.success(isSaved ? "Removed from Saved Items " : "Added to Saved Items ", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,  
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <Card>
      <div className="h-80 bg-card rounded-lg p-4 relative">
        <img src={props.image} className="block" alt={props.name} />
        
        {/* Save Button */}
        <button onClick={handleSave} className="absolute top-4 right-4 text-red-500">
          <Heart size={24} fill={isSaved ? "red" : "none"} />
        </button>
      </div>
      <div className="flex px-4 mt-4 items-center justify-between">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">${props.price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>

      {/* View and Add to Cart Buttons */}
      <div className="mt-1 p-4 flex gap-2">  
        <Link to={`/shop/${props._id}`} className="w-full">
          <Button variant="outline" className="w-full">View</Button>
        </Link>
        <Button className="w-full" onClick={handleClick}>Add To Cart</Button>
      </div>
    </Card>
  );
}

export default ProductCard;
