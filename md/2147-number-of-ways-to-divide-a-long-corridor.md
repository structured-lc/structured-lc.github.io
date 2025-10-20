### Leetcode 2147 (Hard): Number of Ways to Divide a Long Corridor [Practice](https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor)

### Description  
Given a string representing a corridor (`corridor`), where each character is either 'S' (a seat) or 'P' (a plant), you must divide the corridor into non-overlapping sections using room dividers.  
- There is already one divider at the start and one at the end.  
- For each section between two consecutive dividers, it must contain **exactly two seats** (`S`).  
- You can place dividers between any two positions (between index \(i-1\) and \(i\)).  
- You may not be able to divide the corridor as required in all cases.
- Return the number of possible ways to insert the dividers so every section contains exactly two seats. Return 0 if it is not possible. The answer must be returned modulo \(10^9 + 7\).  
- Two ways are considered different if for any possible divider position, a divider is installed in one way and not in the other.

### Examples  

**Example 1:**  
Input: `corridor = "SSPPSPS"`  
Output: `3`  
Explanation: There are 3 different ways to divide the corridor so that each section has exactly 2 seats.  


**Example 2:**  
Input: `corridor = "PPSPSP"`  
Output: `1`  
Explanation: Only 1 way — not installing any divider, as otherwise some section would not have exactly two seats.


**Example 3:**  
Input: `corridor = "S"`  
Output: `0`  
Explanation: There is no way to divide the corridor because you cannot have a section with exactly 2 seats.

### Thought Process (as if you’re the interviewee)  
- First, I would count the total number of seats in the corridor.  
  - If the number of seats is not even or is less than 2, it is impossible to satisfy the requirement — return 0.
- Since each section must have exactly 2 seats, we can only cut between every two seats. The corridor is thus divided into K = #seats / 2 sections.
- The core insight: Between each pair of sections (i.e., after the 2nd, 4th, 6th, ..., seat), I can place a divider at any position between the last seat of the current section and the first seat of the next section (before encountering the next seat).
- For each such pair (gap between two consecutive sections), count how many possible places to put a divider—specifically, the number of consecutive plants (or non-seats) between the last seat of one section and the next seat.
- The answer is the product of the number of ways in all such gaps (each "gap" gives you x possible places).  

Why not use brute-force?  
- Brute force would try every possible subset of divider positions and check validity, which could be exponential in n and would TLE.  
- Since the only degrees of freedom are where to place dividers after every 2nd seat, counting approaches yield an efficient O(n) solution.

### Corner cases to consider  
- Corridor has fewer than 2 seats.
- Number of seats is odd (cannot group into sections of 2).
- Corridors where there are long runs of plants between seat pairs.
- Corridors where all elements are seats and no plants (should still work).
- Corridors with no seats at all.

### Solution

```python
def numberOfWays(corridor: str) -> int:
    MOD = 10**9 + 7
    n = len(corridor)
    
    seat_indices = []
    for i, c in enumerate(corridor):
        if c == 'S':
            seat_indices.append(i)
            
    num_seats = len(seat_indices)
    
    # If seats can't be split in pairs of 2
    if num_seats < 2 or num_seats % 2 != 0:
        return 0
    
    # Each section contains 2 seats, so between every pair of sections
    # (i.e., between each (2k-1)ᵗʰ and (2k)ᵗʰ seat), possible positions
    # to place divider is the number of ways of picking any plant(s)/gap between them
    ways = 1
    for i in range(2, num_seats, 2):
        prev = seat_indices[i-1]
        curr = seat_indices[i]
        gap = curr - prev
        # All plants between these two seats, we can put divider
        ways = (ways * (gap)) % MOD
        
    return ways

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we only need to scan the corridor string once to find all seat indices, and then one more pass through them to calculate the product.
- **Space Complexity:** O(n) in the worst case (if all are seats, seat_indices uses n space), but can be considered O(s), where s is the number of seats, which is at most n.

### Potential follow-up questions (as if you’re the interviewer)  

- If plants are not allowed between seats in a section, how would the approach change?  
  *Hint: Need to ensure there are no 'P's between the two seats forming a section.*  

- What if each section must have **exactly k seats** (not just 2)?  
  *Hint: Group seat indices in blocks of size k, and multiply the gaps accordingly.*

- How would you return the list of all possible division positions, not just the count?  
  *Hint: Enumerate all combinations based on the number of possible splits between sections*


### Summary
This problem uses a **counting + grouping sliding window** pattern: group the constraints (exactly k=2 seats per section), and only consider the possible positions to split at the boundaries between blocks. The insight is that the answer is the product of the sizes of all plant-gaps between seat-pairs, making it efficient (O(n)), and the general pattern can be applied for "count number of ways to divide/partition with exact count" problems.


### Flashcard
Count seats; if not even, return 0; otherwise multiply counts of plants between consecutive seat pairs (positions 2i and 2i+1 for i ≥ 1) modulo 10⁹+7.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Decode Ways II(decode-ways-ii) (Hard)
- Minimum Cost to Cut a Stick(minimum-cost-to-cut-a-stick) (Hard)
- Ways to Split Array Into Three Subarrays(ways-to-split-array-into-three-subarrays) (Medium)