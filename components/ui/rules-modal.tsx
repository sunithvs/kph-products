'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface RulesModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function RulesModal({ isOpen, onOpenChange }: RulesModalProps) {
  const handleProceed = () => {
    window.location.href = 'https://forms.gle/tRh5p3JnpCxzBiB99'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Product Submission Rules</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  1
                </div>
                <p>The product submission will be verified by admin</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  2
                </div>
                <p>The update will take 1 day to reflect on this website</p>
              </div>
            </motion.div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleProceed} className="w-full">
            Proceed to Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
