import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/authContext";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

gsap.registerPlugin(ScrollTrigger);

const VendorDashboard = () => {
  const { token } = useAuthContext();
  const [vendorData, setVendorData] = useState(null);
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState(null);
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refs for GSAP animations
  const profileRef = useRef(null);
  const statsRef = useRef(null);
  const revenueChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Static sales data
  const staticSalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: [45000, 59000, 80000, 81000, 56000, 95000],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#16a34a",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#16a34a",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/product-listings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.products.length > 0) {
          setVendorData(response.data.products[0].vendor);
        }
        setProducts(response.data.products);

        // Calculate inventory data from products
        const inventory = {};
        response.data.products.forEach((product) => {
          if (inventory[product.name]) {
            inventory[product.name]++;
          } else {
            inventory[product.name] = 1;
          }
        });

        setInventoryData({
          labels: Object.keys(inventory),
          datasets: [
            {
              data: Object.values(inventory),
              backgroundColor: [
                "rgba(16, 185, 129, 0.8)", // emerald
                "rgba(14, 165, 233, 0.8)", // sky
                "rgba(168, 85, 247, 0.8)", // purple
                "rgba(249, 115, 22, 0.8)", // orange
                "rgba(236, 72, 153, 0.8)", // pink
              ],
              hoverBackgroundColor: [
                "rgba(16, 185, 129, 1)",
                "rgba(14, 165, 233, 1)",
                "rgba(168, 85, 247, 1)",
                "rgba(249, 115, 22, 1)",
                "rgba(236, 72, 153, 1)",
              ],
              borderWidth: 0,
              hoverOffset: 15,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // GSAP Animations
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        // Initial state
        gsap.set(".dashboard-content", { opacity: 0, y: 30 });

        // Entry animation
        gsap.to(".dashboard-content", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2, // Slight delay after page transition
        });

        // Profile Section Animation
        gsap.from(profileRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });

        // Stats Grid Animation
        const statCards = statsRef.current.querySelectorAll(".stat-card");
        gsap.from(statCards, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });

        // Revenue Chart Animation
        gsap.from(revenueChartRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: revenueChartRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });

        // Enhanced Pie Chart Animation
        const pieChartTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: pieChartRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        });

        pieChartTimeline
          .from(pieChartRef.current, {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          })
          .from(
            pieChartRef.current.querySelector("canvas"),
            {
              rotate: -180,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .from(
            pieChartRef.current.querySelector("h3"),
            {
              y: 20,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.8"
          );
      });

      return () => ctx.revert(); // Cleanup
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto dashboard-content">
        {/* Vendor Profile Section */}
        <div
          ref={profileRef}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-green-100 rounded-xl flex items-center justify-center text-3xl font-bold text-green-600">
              {vendorData?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vendorData?.name}
              </h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {vendorData?.email}
                </p>
                {/* <p>
                                    <span className="font-medium">Location:</span> {vendorData?.location}
                                </p> */}
                <p>
                  <span className="font-medium">Total Products:</span>{" "}
                  {products.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              label: "Total Revenue",
              value: products.reduce((sum, product) => sum + product.price, 0),
              prefix: "₹",
            },
            {
              label: "Products Listed",
              value: products.length,
            },
            {
              label: "Organic Products",
              value: products.filter((p) => p.organic).length,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)]"
            >
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stat.prefix}
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div
            ref={revenueChartRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)]"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Revenue Overview
            </h3>
            <Line
              data={staticSalesData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    titleColor: "#16a34a",
                    titleFont: { weight: "600" },
                    bodyColor: "#374151",
                    bodyFont: { size: 14 },
                    padding: 12,
                    borderColor: "#e5e7eb",
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                      label: function (context) {
                        return `₹${context.parsed.y.toLocaleString()}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.05)",
                    },
                    ticks: {
                      callback: function (value) {
                        return "₹" + value.toLocaleString();
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>

          {/* Inventory Chart */}
          <div
            ref={pieChartRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 shadow-[0_0_30px_rgba(0,128,0,0.1)]"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Distribution
            </h3>
            {inventoryData && (
              <Pie
                data={inventoryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      titleColor: "#16a34a",
                      titleFont: { weight: "600" },
                      bodyColor: "#374151",
                      bodyFont: { size: 14 },
                      padding: 12,
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                      callbacks: {
                        label: function (context) {
                          return `${context.label}: ${context.parsed} units`;
                        },
                      },
                    },
                  },
                  cutout: "40%",
                  animation: false, // Disable Chart.js animation to use GSAP instead
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
