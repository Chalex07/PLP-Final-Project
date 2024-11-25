-- CREATE DATABASE JobPortal;
-- Employers Table
-- CREATE TABLE Employers (
--     EmployerID INT AUTO_INCREMENT PRIMARY KEY,
--     Name VARCHAR(100) NOT NULL,
--     ContactInfo VARCHAR(100) NOT NULL,
--     CompanyDetails TEXT NOT NULL
-- );

-- Jobs Table
-- CREATE TABLE Jobs (
--     JobID INT AUTO_INCREMENT PRIMARY KEY,
--     EmployerID INT NOT NULL,
--     JobTitle VARCHAR(100) NOT NULL,
--     Description TEXT NOT NULL,
--     Requirements TEXT NOT NULL,
--     Location VARCHAR(100) NOT NULL,
--     SalaryRange VARCHAR(50),
--     Status ENUM('Open', 'Closed') DEFAULT 'Open',
--     FOREIGN KEY (EmployerID) REFERENCES Employers(EmployerID)
-- );

-- Candidates Table
-- CREATE TABLE Candidates (
--     CandidateID INT AUTO_INCREMENT PRIMARY KEY,
--     Name VARCHAR(100) NOT NULL,
--     ContactInfo VARCHAR(100) NOT NULL,
--     ResumeURL TEXT NOT NULL,
--     Skills TEXT NOT NULL,
--     Experience TEXT NOT NULL
-- );

-- Applications Table
-- CREATE TABLE Applications (
--     ApplicationID INT AUTO_INCREMENT PRIMARY KEY,
--     JobID INT NOT NULL,
--     CandidateID INT NOT NULL,
--     Status ENUM('Pending', 'Accepted', 'Rejected') DEFAULT 'Pending',
--     DateApplied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (JobID) REFERENCES Jobs(JobID),
--     FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID)
-- );

-- Job Status Updates
-- CREATE TABLE JobStatusUpdates (
--     UpdateID INT AUTO_INCREMENT PRIMARY KEY,
--     JobID INT NOT NULL,
--     CandidateID INT,
--     Status ENUM('Hired', 'Pending', 'Vacant'),
--     FOREIGN KEY (JobID) REFERENCES Jobs(JobID),
--     FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID)
-- );

-- create database logisticsDB;
-- Table for Vendors
-- CREATE TABLE Vendors (
--     VendorID INT AUTO_INCREMENT PRIMARY KEY,
--     VendorName VARCHAR(255) NOT NULL,
--     VendorContact VARCHAR(100)
-- );

-- Table for Products
-- CREATE TABLE Products (
--     ProductID INT AUTO_INCREMENT PRIMARY KEY,
--     ProductName VARCHAR(255) NOT NULL,
--     VendorID INT,
--     FOREIGN KEY (VendorID) REFERENCES Vendors(VendorID)
-- );

-- Table for Delivery Agents
-- CREATE TABLE DeliveryAgents (
--     AgentID INT AUTO_INCREMENT PRIMARY KEY,
--     AgentName VARCHAR(255) NOT NULL,
--     ContactNumber VARCHAR(100)
-- );

-- Table for Customers
-- CREATE TABLE Customers (
--     CustomerID INT AUTO_INCREMENT PRIMARY KEY,
--     CustomerName VARCHAR(255) NOT NULL,
--     ContactNumber VARCHAR(100),
--     Address VARCHAR(255)
-- );


-- Table for Deliveries
-- CREATE TABLE Deliveries (
--     DeliveryID INT AUTO_INCREMENT PRIMARY KEY,
--     ProductID INT,
--     AgentID INT,
--     CustomerID INT,
--     DeliveryDate DATE,
--     DeliveryLocation VARCHAR(255),
--     FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
--     FOREIGN KEY (AgentID) REFERENCES DeliveryAgents(AgentID),
--     FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
-- );

        