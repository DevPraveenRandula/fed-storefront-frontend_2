import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F9FA] pt-12">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Apvvhip4NYcqlYPooIUcPxGsRKWYFC.png"
                alt="iShield Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-semibold">Warranty On iShield</span>
            </div>
            <Button variant="outline" className="bg-white">
              Check your iShield Warranty
            </Button>
            <p className="text-sm text-muted-foreground">
              Discover the Best Premium Apple Store in Sri Lanka: iPhones, MacBooks, iPads, AirPods, and More!
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/returns">Returns and Exchanges</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping and Delivery</Link>
              </li>
              <li>
                <Link href="/terms">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy and Policies</Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold mb-4">Useful link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/track">Track Your Order</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/trade">Trade Your Device</Link>
              </li>
              <li>
                <Link href="/rss">RSS Feed</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Colombo Branch</p>
                <p>505, Union Place Colombo 07</p>
                <p>+94 71 6666 555</p>
              </div>
              <div>
                <p className="font-medium">Jaffna Branch</p>
                <p>648, Hospital Road, Jaffna.</p>
                <p>+94 71 6666 555</p>
              </div>
              <Link href="mailto:contact@ishield.lk" className="block">
                Email Us
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 py-6 text-sm text-center text-muted-foreground">
          Copyright © iSpot Lanka (Pvt) Ltd 2024. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

