### Leetcode 1109 (Medium): Corporate Flight Bookings [Practice](https://leetcode.com/problems/corporate-flight-bookings)

### Description  
Given an integer n representing the number of flights labeled from 1 to n, and an array bookings where each booking is a triplet [firstᵢ, lastᵢ, seatsᵢ], each meaning that seatsᵢ seats are reserved on every flight from firstᵢ to lastᵢ (inclusive).  
Return an array answer of length n, where answer[i] is the total number of seats reserved for the (i+1)ᵗʰ flight.

### Examples  

**Example 1:**  
Input:  
`bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5`  
Output:  
`[10, 55, 45, 25, 25]`  
*Explanation:  
- Booking [1,2,10] adds 10 seats to flight 1 and 2  
- Booking [2,3,20] adds 20 seats to flight 2 and 3  
- Booking [2,5,25] adds 25 seats to flights 2,3,4,5  
Final bookings:  
flight 1: 10  
flight 2: 10 + 20 + 25 = 55  
flight 3: 20 + 25 = 45  
flight 4: 25  
flight 5: 25*

**Example 2:**  
Input:  
`bookings = [[1,1,10],[2,2,20],[3,3,30]], n = 3`  
Output:  
`[10, 20, 30]`  
*Explanation:  
Each booking updates a single flight directly.*

**Example 3:**  
Input:  
`bookings = [[1, 3, 10], [2, 3, 5]], n = 3`  
Output:  
`[10, 15, 15]`  
*Explanation:  
- Flight 1: +10  
- Flight 2: +10 (from first), +5 (from second) = 15  
- Flight 3: +10 (from first), +5 (from second) = 15*

### Thought Process (as if you’re the interviewee)  
For each booking [first, last, seats], a brute-force approach would loop over every flight from first to last and add seats to each one. Since ranges can be large, this can be very slow for big n and many bookings.

To optimize, I'll use the **difference array** technique:
- For booking [first, last, seats], increment seats at first - 1 index, and decrement seats at last index.
- After all bookings, do a prefix sum to get the final seat counts.
This approach works because incrementing at start and decrementing after the end will cause a cumulative sum to reflect the booked values exactly in the right ranges.

This is a classic interval update problem and avoids O(n × number of bookings) runtime.

### Corner cases to consider  
- n = 1 (single flight)
- Multiple bookings for the same range
- Bookings with firstᵢ == lastᵢ (single flight bookings)
- No bookings (empty bookings list)
- Bookings covering the entire [1, n] range

### Solution

```python
def corpFlightBookings(bookings, n):
    # Initialize a difference array for n flights with 0 bookings
    diff = [0] * (n + 1)

    # Apply bookings as range updates
    for first, last, seats in bookings:
        diff[first - 1] += seats
        if last < n:
            diff[last] -= seats

    # Compute prefix sum to get actual seat bookings for each flight
    res = []
    curr = 0
    for i in range(n):
        curr += diff[i]
        res.append(curr)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)  
  - n for final prefix sum pass
  - m for processing bookings (m = number of bookings)
- **Space Complexity:** O(n)  
  - The difference array uses n+1 space; result array uses n

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large n (1e7 or greater)?
  *Hint: Can you process bookings in a streaming way? Is full array storage needed?*

- What if bookings have concurrent updates or are received in an online fashion?
  *Hint: Consider lazy evaluation or segment trees for more flexible interval updates.*

- What if, instead of queries for all flights, you want to answer multiple arbitrary range sum queries efficiently?
  *Hint: Prefix sums are useful, but consider using a segment tree or binary indexed tree for range sum queries with updates.*

### Summary

This problem uses the prefix sum and difference array pattern for efficient range updates, avoiding a brute-force approach. It's a classic example of optimizing repeated range modifications, commonly useful in range update and interval sum query scenarios.  
Similar logic often shows up in ray sweep, interval covering, and array manipulation problems.