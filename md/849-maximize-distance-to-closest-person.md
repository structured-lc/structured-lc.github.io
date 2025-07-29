### Leetcode 849 (Medium): Maximize Distance to Closest Person [Practice](https://leetcode.com/problems/maximize-distance-to-closest-person)

### Description  
Given a row of seats represented by an array, where seats[i] = 1 means that the iᵗʰ seat is occupied and seats[i] = 0 means it is empty, you want to sit such that your distance to the closest person is maximized. Return the maximum possible distance to the closest person.  
You are guaranteed there is at least one empty and one occupied seat.

### Examples  

**Example 1:**  
Input: `[1,0,0,0,1,0,1]`  
Output: `2`  
Explanation: Sitting at seat 2 or seat 3, the closest person is 2 seats away.

**Example 2:**  
Input: `[1,0,0,0]`  
Output: `3`  
Explanation: Sitting at seat 3 (the end), the closest person is at seat 0, which is 3 seats away.

**Example 3:**  
Input: `[0,1]`  
Output: `1`  
Explanation: The only empty seat is seat 0, with a person at seat 1. The distance is 1.

### Thought Process (as if you’re the interviewee)  
Starting with brute force, for each empty seat, I could scan left and right for the nearest person, but this leads to a time complexity of O(n²) and is inefficient for large arrays.  
A better method is to use a two-pass approach:  
- First, scan left-to-right, for each seat compute the distance to the nearest person on the left.  
- Then, scan right-to-left for the nearest person on the right.  
- For each empty seat, the closest person is the minimum of these two distances.  
- The seat maximizing this minimal distance gives the solution.  
This achieves O(n) time and is efficient even for large inputs.

Another way is to look for the largest stretch of consecutive zeros (empty seats). For stretches in the middle, the ideal seat is in the middle (distance is ⌊length/2⌋). For stretches at the ends, the distance is just the length of the stretch.

### Corner cases to consider  
- The first or last seat in the array is empty (long run on either end)
- All intermediate seats are empty  
- Multiple equally long distances — choose the maximum
- Only two seats, one empty and one filled (minimal length)

### Solution

```python
def maxDistToClosest(seats):
    n = len(seats)
    max_dist = 0
    prev = -1  # last occupied seat index

    for i in range(n):
        if seats[i] == 1:
            if prev == -1:
                # all the leading zeros (empty seats at the start)
                max_dist = max(max_dist, i)
            else:
                # middle zeros
                dist = (i - prev) // 2
                max_dist = max(max_dist, dist)
            prev = i

    # trailing zeros (empty seats at the end)
    max_dist = max(max_dist, n - 1 - prev)
    return max_dist
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We iterate through the array at most twice.
- **Space Complexity:** O(1) — Only a few variables are used, independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if people can only enter the seat from one direction?
  *Hint: Consider only left-to-right or right-to-left passes and modify edge handling.*

- How would you handle if groups (families) sit together and you want to maximize distance between groups?
  *Hint: Identify group boundaries, not individuals, and treat group starts/ends as "occupied".*

- Can you generalize this for placing k people rather than just one, maximizing the minimum distance between any two?
  *Hint: This is a variant of the "max-min distance" problem, and can be solved with binary search for k placements.*

### Summary
This problem uses the **greedy/two pointer** sliding scan pattern on arrays, optimized by considering stretches of empty seats and tracking the distance to the nearest occupied seats. This approach is broadly useful for problems involving maximizing or minimizing intervals/distances (e.g., placing routers, partitioning a line).