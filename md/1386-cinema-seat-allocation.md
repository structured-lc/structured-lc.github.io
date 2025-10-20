### Leetcode 1386 (Medium): Cinema Seat Allocation [Practice](https://leetcode.com/problems/cinema-seat-allocation)

### Description  
You're given n rows in a cinema, each with 10 seats (numbered 1-10). Some seats are reserved (provided as a list of [row, seat] pairs). Families require a block of 4 adjacent seats in a row (but may NOT cross the aisle between seats 4 and 5, or 6 and 7). Return the maximum number of families of 4 that can be seated.

### Examples  

**Example 1:**  
Input: `n = 3`, `reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]`  
Output: `4`  
*Explanation: Without restrictions, each row can fit 2 families. Reserved seats block some options, but here, only row 1 blocks one family, rest fit two each; total is 4.*

**Example 2:**  
Input: `n = 2`, `reservedSeats = [[2,1],[1,8],[2,6]]`  
Output: `2`  
*Explanation: Only one family is blocked by reserved seat 6.*

**Example 3:**  
Input: `n = 4`, `reservedSeats = []`  
Output: `8`  
*Explanation: No reservations, 2 families per row × 4 rows = 8.*

### Thought Process (as if you’re the interviewee)  
Without reservations, every row can fit two families: seats 2-5, seats 6-9. With reservations, track for each row which blocks are available:
- For rows with reservations, check if the blocks [2-5], [4-7], [6-9] are clear.
- Families can't sit across the central aisle (between seats 4-5, 6-7).
- For efficiency, use bitmasking or sets to record reserved positions per row.

### Corner cases to consider  
- No reservations (full capacity)
- All seats in a row reserved (row can't have a family)
- Reserved seats at edges (don't affect families)
- Large n

### Solution

```python
def maxNumberOfFamilies(n, reservedSeats):
    from collections import defaultdict
    reserved_map = defaultdict(set)
    for row, seat in reservedSeats:
        reserved_map[row].add(seat)
    result = 0
    for row in reserved_map:
        curr = reserved_map[row]
        left = all(seat not in curr for seat in [2,3,4,5])
        right = all(seat not in curr for seat in [6,7,8,9])
        middle = all(seat not in curr for seat in [4,5,6,7])
        if left and right:
            result += 2
        elif left or right or middle:
            result += 1
        # else: row blocks both families
    # Rows without reservations can fit 2 families each
    result += (n - len(reserved_map)) * 2
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R), where R is number of reserved seats (plus at most one scan per reserved row).
- **Space Complexity:** O(R), for storing restricted seat sets per row.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for very large n and sparse reservations?  
  *Hint: Avoid per-row data for rows with no reservations!*

- Can you use bit manipulation to speed up seat block checks?  
  *Hint: Encode row seats as bitmasks and AND with mask values.*

- What if the block size or seat positions needed change?  
  *Hint: Make the family block flexible and compute ranges dynamically.*

### Summary
This solution uses a hash map to record reserved seats per row, and checks three block patterns. It's an application of set/bitmask pattern for range availability—pattern useful for seating, parking, meeting room, or interval block allocation questions.


### Flashcard
For each row, check if reserved seats block family seating (2-5, 6-9); use bitmasking for efficient checks.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Booking Concert Tickets in Groups(booking-concert-tickets-in-groups) (Hard)