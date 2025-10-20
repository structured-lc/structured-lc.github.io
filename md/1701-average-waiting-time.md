### Leetcode 1701 (Medium): Average Waiting Time [Practice](https://leetcode.com/problems/average-waiting-time)

### Description  
Given a queue of customers at a restaurant, each described by their arrival time and the amount of time it takes to prepare their order, return the average waiting time for all customers. Each customer starts their order only after the previous one is finished. If a customer arrives before the chef is free, they must wait until the chef is free. If the chef is already free, food prep starts upon arrival. The "waiting time" for each customer is defined as the time from their arrival until their order is complete.

### Examples  

**Example 1:**  
Input: `[[1,2],[2,5],[4,3]]`  
Output: `5.0`  
*Explanation:  
- Customer 1 arrives at 1, order starts at 1 (chef is ready), finishes at 3. Wait = 3 - 1 = 2  
- Customer 2 arrives at 2, chef ready at 3, order starts at 3, finishes at 8. Wait = 8 - 2 = 6  
- Customer 3 arrives at 4, chef ready at 8, order starts at 8, finishes at 11. Wait = 11 - 4 = 7  
- Average wait = (2 + 6 + 7) / 3 = 5.0*

**Example 2:**  
Input: `[[5,2],[6,4],[8,3]]`  
Output: `3.0`  
*Explanation:  
- Customer 1: arrives at 5, starts at 5, finishes at 7, wait = 2  
- Customer 2: arrives at 6, chef ready at 7, starts at 7, finishes at 11, wait = 5  
- Customer 3: arrives at 8, chef ready at 11, starts at 11, finishes at 14, wait = 6  
- Average wait = (2 + 5 + 6) / 3 = 4.33...*

**Example 3:**  
Input: `[[1,1]]`  
Output: `1.0`  
*Explanation:  
- Only one customer: arrives at 1, starts at 1, finishes at 2. Wait = 1  
- Average wait = 1.0*


### Thought Process (as if you’re the interviewee)  
- Start by thinking about what "waiting time" means – for each customer it's finish time minus arrival time.
- Only one chef works at a time, so customers are processed in order. Chef can't start an order until the previous one is done or the next customer arrives.
- Use a running variable to keep track of when the chef will be free (current time).
- As we iterate:
  - If current time < arrival, set current time = arrival (chef waits for customer).
  - Add the current customer's cooking time to current time (order finished).
  - Waiting time is (current time - arrival time).
  - Accumulate total waiting time.
- Finally, divide total waiting time by customer count for average.

This approach is O(n): a single pass, which is optimal since every input must be processed.

### Corner cases to consider  
- Only one customer.
- All customers arriving after previous order is done (no actual wait).
- Customers arriving in quick succession (back-to-back backlog).
- All cooking times are zero (instant completion).
- Customers arriving before chef is available (must wait).
- Very large input sizes.

### Solution

```python
def averageWaitingTime(customers):
    # Track when chef is next available
    current_time = 0
    # Total waiting time for all customers
    total_wait = 0

    for arrival, cook_time in customers:
        # Chef starts this order when either current_time (after prior) or arrival
        # If chef is free before customer arrives, must wait for arrival
        if current_time < arrival:
            current_time = arrival
        current_time += cook_time  # Finish this order
        # Waiting time: order finish - arrival time
        total_wait += (current_time - arrival)
    
    return total_wait / len(customers)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We perform a single loop over the array of n customers.
- **Space Complexity:** O(1). Only a few variables are used for tracking state. No extra data structures used aside from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What happens if orders can be processed in parallel by multiple chefs?  
  *Hint: Consider using a min-heap to track chef availability.*

- How would you modify the solution if customers could arrive in any order (not sorted by arrival time)?  
  *Hint: Sort input by arrival time first.*

- Can you calculate the maximum waiting time among all customers as well as the average?  
  *Hint: Track max wait time during accumulation.*

### Summary
This is a classic simulation problem that uses a running pointer ("current time") and cumulative calculation. It's a good example of the "Greedy / Timeline" pattern, where you process events in time order, maintaining state as you go. This pattern appears in scheduling, interval problems, and problems with queues or sequential dependencies.


### Flashcard
Track chef's current time; for each customer, start cooking at max(arrival, current time), update current time, and sum finish time minus arrival for each.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Average Height of Buildings in Each Segment(average-height-of-buildings-in-each-segment) (Medium)