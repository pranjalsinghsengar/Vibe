import React, { useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import { apiurl } from '../config/config';
import { getCookie } from '../config/webStorage';

const isEmpty = (v) => !v || v.trim() === '';

function NewTenant() {
  const token = getCookie('sctoken');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    tenantname: '',
    password: '',
    address: {
      name: '',
      line1: '',
      line2:'',
      city: '',
      province: '',
      zip: '',
      country: '',
      province_code: '',
      country_code: ''
    },
    preferences: {
      language: 'en',
      timeZone: 'UTC'
    },
    billing: {
      paymentMethod: 'paypal',
      billingCycle: 'annually'
    },
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const err = {};

    if (isEmpty(formData.username)) err.username = 'Username is required';
    if (isEmpty(formData.email)) err.email = 'Email is required';
    if (isEmpty(formData.tenantname)) err.tenantname = 'Tenant name is required';
    if (isEmpty(formData.password)) err.password = 'Password is required';

    Object.entries(formData.address).forEach(([k, v]) => {
      if (isEmpty(v)) err[`address.${k}`] = `${k} is required`;
    });

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const fieldClass = (name) =>
    `w-full p-3 rounded-sm border transition-all outline-none
    ${errors[name] ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-primary focus:border-primary'}`;

  /* ---------------- HANDLERS ---------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
    setErrors(prev => ({ ...prev, [`address.${name}`]: '' }));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await axios.post(
        `${apiurl}/api/whatsapp/tenant/create?config_id=10001`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('Tenant created successfully 🎉');
    } catch (err) {
      setMessage('API error while creating tenant');
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <Layout>
      <div className="min-h-screen bg-secondary py-12">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">

          <h1 className="text-3xl font-bold mb-8">Create a Customer</h1>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* BASIC */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={fieldClass('username')}
                  />
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>

                <div>
                  <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={fieldClass('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    name="tenantname"
                    placeholder="Company Name"
                    value={formData.tenantname}
                    onChange={handleInputChange}
                    className={fieldClass('tenantname')}
                  />
                  {errors.tenantname && <p className="text-red-500 text-xs mt-1">{errors.tenantname}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={fieldClass('password')}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>
            </section>

            {/* ADDRESS */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Address</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {Object.keys(formData.address).map((k) => (
                  <div key={k}>
                    <input
                      name={k}
                      placeholder={k.replace('_', ' ').toUpperCase()}
                      value={formData.address[k]}
                      onChange={handleAddressChange}
                      className={fieldClass(`address.${k}`)}
                    />
                    {errors[`address.${k}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`address.${k}`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SUBMIT */}
            <div className="flex justify-between items-center border-t pt-6">
              {message && <p className="text-green-600 font-medium">{message}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-light-primary disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Tenant'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewTenant;
