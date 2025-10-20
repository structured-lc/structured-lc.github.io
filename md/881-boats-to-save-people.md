### Leetcode 881 (Medium): Boats to Save People [Practice](https://leetcode.com/problems/boats-to-save-people)

### Description  
Given a list of people with different **weights** and a **boat weight limit**, each boat can carry at most two people, as long as the total weight is within the limit. The goal is to calculate the minimum number of boats needed to rescue everyone.

### Examples  

**Example 1:**  
Input: `people = [1,2]`, `limit = 3`  
Output: `1`  
*Explanation: Both can share a boat since 1 + 2 = 3 ≤ 3.*

**Example 2:**  
Input: `people = [3,2,2,1]`, `limit = 3`  
Output: `3`  
*Explanation: Optimal pairing is (1,2), (2), (3). Need 3 boats.*

**Example 3:**  
Input: `people = [3,5,3,4]`, `limit = 5`  
Output: `4`  
*Explanation: Pairs are (3), (3), (4), (5) – each person needs their own boat, as none can pair without exceeding 5.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider a **brute-force** approach: try all possible pairings, which would be very inefficient (factorial time, not feasible for large input).  

The optimization insight is that since each boat holds at most two people, we want to maximize utilization by always pairing the *heaviest* remaining person with the *lightest* person they can be paired with without going above the boat’s limit.

- **Sort** the list so we can efficiently pair the smallest and largest weights.
- Use two pointers:
  - One at the **start** (lightest person).
  - One at the **end** (heaviest person).
- If the sum of their weights is within the limit, put both on the boat and move both pointers.
- If not, put only the heavier person (move the end pointer).
- Repeat until all people are assigned, incrementing the boat count for every iteration.

This **greedy approach** always tries to fit two people into a boat whenever possible, minimizing total boats required.

### Corner cases to consider  
- Input is empty ⇒ should return 0 (no boats needed).
- Only one person ⇒ must have at least one boat.
- All people heavier than limit ⇒ not allowed by problem description, but code should handle.
- All people have max weight just under limit, and two can be paired.
- Large arrays for performance.
- People whose individual weight is exactly equal to limit (must go alone).

### Solution

```python
def numRescueBoats(people, limit):
    # Sort the array to facilitate efficient pairing
    people.sort()
    left = 0                 # Lightest person index
    right = len(people) - 1  # Heaviest person index
    boats = 0

    # Continue until everyone is assigned a boat
    while left <= right:
        # Try to pair the lightest and heaviest person if possible
        if people[left] + people[right] <= limit:
            left += 1      # Both go into one boat
        # Heaviest person always goes (either with lightest or alone)
        right -= 1
        boats += 1         # Took one boat for this iteration

    return boats
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)
  - Sorting the array takes O(n log n), and the two-pointer scan is O(n).
- **Space Complexity:** O(1) extra space
  - Only pointers and a count; sorting can be in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each boat could carry up to *k* people?
  *Hint: Could use a similar greedy approach, but need to check how many smallest people fit with the heaviest.*
  
- What if instead of a list, people arrived as a stream?
  *Hint: Need to keep lightest and heaviest accessible – maybe a double-ended queue.*

- How would you output the actual pairings or groupings put in each boat?
  *Hint: Instead of just counting, store the group/indices for each pairing.*

### Summary
This problem uses a classic **two-pointer + greedy** approach, typical for "pairing" and "max utilization" scenarios: **pairing largest with smallest** to maximize space, minimize resources. This coding pattern applies to problems like "minimize taxis needed," "group the maximum number of people by sum requirement," or general container-packing and scheduling problems where greedy + sorting first is the most efficient solution.


### Flashcard
Sort weights, then use two pointers (lightest and heaviest); pair them if possible, otherwise send the heaviest alone—greedy pairing minimizes boats.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
