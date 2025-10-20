### Leetcode 2073 (Easy): Time Needed to Buy Tickets [Practice](https://leetcode.com/problems/time-needed-to-buy-tickets)

### Description  
You are given an array `tickets` of length n, where each element `tickets[i]` is the number of tickets the iᵗʰ person in a queue wants to buy. Each person buys one ticket at a time, which takes 1 second. After buying a ticket, they move to the end of the line instantly if they need more. When a person is done, they leave the line.  
Given an index k, return the total seconds required for the person originally at position k to finish buying all their tickets.

### Examples  

**Example 1:**  
Input: `tickets = [2,3,2], k = 2`  
Output: `6`  
Explanation:  
- Initial queue: [2,3,2], k=2 is the last person.
- Person 0 buys (1) → [1,3,2]; time=1  
- Person 1 buys (1) → [1,2,2]; time=2  
- Person 2 buys (1) → [1,2,1]; time=3  
- Person 0 buys (1) → [0,2,1]; time=4  
- Person 1 buys (1) → [0,1,1]; time=5  
- Person 2 buys (1) → [0,1,0]; time=6  
Person at k=2 is done at 6s.

**Example 2:**  
Input: `tickets = [5,1,1,1], k = 0`  
Output: `8`  
Explanation:  
- Main idea: Person 0 buys once in each full round until done. Others will leave the line much sooner.
- Round 1: every person buys, tickets: [4,0,0,0], time=4  
- Remaining: only 0 left, 4 tickets remaining, time=4  
Total time = 8.

**Example 3:**  
Input: `tickets = [1,1,7,1,1,1], k = 2`  
Output: `7`  
Explanation:  
- Before k: everyone else leaves after 1 second each  
- k=2, must cycle to back and buy repeatedly until 7 done  
- All others buy once; total = 7.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Simulate the process by looping through the queue repeatedly.
  - Each person with tickets buys one. Increase time by 1. If it’s k and tickets[k] reaches 0 after the purchase, return total time.
  - Works for small n, but for larger n this is inefficient (O(sum(tickets))).

- **Optimization:**  
  - Realize that person k takes as many rounds as tickets[k]. In each round, each person before or at k can buy up to one ticket, while those after k can buy only up to tickets[k]-1 (since they leave before last round).
  - Formula for total time:  
    For all i:
      - if i ≤ k: add min(tickets[i], tickets[k])
      - if i > k: add min(tickets[i], tickets[k]-1)
  - This reduces time to O(n). Simple iteration and min comparison.

- **Why this approach:**  
  - No need to simulate ticket queue rotation: the math above directly counts all possible seconds each index contributes.  
  - Space O(1), time O(n).

### Corner cases to consider  
- All tickets = 1 (everyone leaves after first round)  
- Only one person in queue  
- tickets[k] = 1 (k only buys once)
- tickets = [] (should not happen per constraints)
- k at start/end of array

### Solution

```python
def timeRequiredToBuy(tickets, k):
    time = 0
    n = len(tickets)
    for i in range(n):
        # For persons before or at k: min(tickets[i], tickets[k])
        # For persons after k: min(tickets[i], tickets[k] - 1)
        if i <= k:
            time += min(tickets[i], tickets[k])
        else:
            time += min(tickets[i], tickets[k] - 1)
    return time
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of people. We loop through the queue once making O(1) operations per person.
- **Space Complexity:** O(1), just constant extra variables; does not depend on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if someone can buy more than one ticket per turn?  
  *Hint: How does the seconds-per-ticket change?*

- How would you modify for variable queue insert/removal positions (not only at end)?  
  *Hint: Would index updates or a different data structure help?*

- What if tickets could be bought only at odd or even seconds?  
  *Hint: Can the time sum be mathematically adjusted?*

### Summary
This problem uses the **counting/greedy** pattern—since each person's impact can be bounded by iteration and min comparison, we avoid simulation and rotation. The principle of "count how many times each person affects the outcome" is common in queue simulation and scheduling problems, and can be generalized to processes with cycles or repeat actions, such as "round robin" tasks in OS scheduling.


### Flashcard
Calculate the time needed to buy tickets by considering the number of rounds each person takes.

### Tags
Array(#array), Queue(#queue), Simulation(#simulation)

### Similar Problems
- Number of Students Unable to Eat Lunch(number-of-students-unable-to-eat-lunch) (Easy)